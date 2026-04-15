import bcrypt from 'bcrypt'
import { db, users } from '~/drizzle/db'
import { JWTEnhanced } from '~~/server/utils/jwt-enhanced'
import { getBeijingTime } from '~/utils/timeUtils'
import { validateOAuthRegisterCredentials } from '~/utils/oauth-register'
import { isSecureRequest } from '~~/server/utils/request-utils'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, name, password, confirmPassword, grade, class: classValue } = body

    if (!username || !name || !password || !confirmPassword || !grade || !classValue) {
      throw createError({
        statusCode: 400,
        message: '所有字段都是必填项'
      })
    }

    const validationError = validateOAuthRegisterCredentials(username, password, confirmPassword)
    if (validationError) {
      throw createError({
        statusCode: 400,
        message: validationError
      })
    }

    if (name.length < 2 || name.length > 50) {
      throw createError({
        statusCode: 400,
        message: '姓名长度需要在2-50个字符之间'
      })
    }

    const validGrades = ['高一年级', '高二年级', '高三年级']
    if (!validGrades.includes(grade)) {
      throw createError({
        statusCode: 400,
        message: '无效的年级选择'
      })
    }

    const classNum = parseInt(classValue, 10)
    if (isNaN(classNum) || classNum <= 0) {
      throw createError({
        statusCode: 400,
        message: '无效的班级选择'
      })
    }

    const existingUser = await db.query.users.findFirst({
      where: (t, { eq }) => eq(t.username, username)
    })

    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: '用户名已存在，请使用其他用户名'
      })
    }

    const existingUserByDetails = await db.query.users.findFirst({
      where: (t, { eq, and }) => and(
        eq(t.name, name),
        eq(t.grade, grade),
        eq(t.class, classValue)
      )
    })

    if (existingUserByDetails) {
      throw createError({
        statusCode: 409,
        message: '用户已存在'
      })
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const now = getBeijingTime()

      const newUser = (await db
        .insert(users)
        .values({
          username,
          name,
          password: hashedPassword,
          grade,
          class: classValue,
          role: 'USER',
          status: 'active',
          createdAt: now,
          updatedAt: now,
          passwordChangedAt: now,
          lastLogin: now,
          forcePasswordChange: false
        })
        .returning({ id: users.id, username: users.username, role: users.role }))[0]

      if (!newUser) {
        throw new Error('Failed to create user')
      }

      const isSecure = isSecureRequest(event)
      const token = JWTEnhanced.generateToken(newUser.id, 'USER')
      setCookie(event, 'auth-token', token, {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      })

      return {
        success: true,
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role
        }
      }
    } catch (error: any) {
      console.error('Database error during registration:', error)
      throw createError({
        statusCode: 500,
        message: error.message || '注册失败，请稍后重试'
      })
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Registration error:', error)
    throw createError({
      statusCode: 500,
      message: '注册失败，请稍后重试'
    })
  }
})
