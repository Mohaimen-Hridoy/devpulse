import { pool } from "../../db/index.js"

const createIssue = async (payload: any, user: any) => {
  const { title, description, type } = payload

  const result = await pool.query(
    `INSERT INTO issues (title, description, type, status, reporter_id)
     VALUES ($1, $2, $3, 'open', $4)
     RETURNING *`,
    [title, description, type, user.id]
  )

  return result.rows[0]
}

const getAllIssues = async (query: any) => {
  const { sort = "newest", type, status } = query

  let sql = `SELECT * FROM issues`
  const conditions: string[] = []
  const values: any[] = []

  if (type) {
    values.push(type)
    conditions.push(`type = $${values.length}`)
  }

  if (status) {
    values.push(status)
    conditions.push(`status = $${values.length}`)
  }

  if (conditions.length) {
    sql += ` WHERE ${conditions.join(" AND ")}`
  }

  sql += sort === "oldest"
    ? ` ORDER BY created_at ASC`
    : ` ORDER BY created_at DESC`

  const result = await pool.query(sql, values)

  const issues = await Promise.all(
    result.rows.map(async (issue) => {
      const reporter = await pool.query(
        `SELECT id, name, role FROM users WHERE id=$1`,
        [issue.reporter_id]
      )

      return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: reporter.rows[0],
        created_at: issue.created_at,
        updated_at: issue.updated_at,
      }
    })
  )

  return issues
}

const getSingleIssue = async (id: string) => {
  const result = await pool.query(
    `SELECT * FROM issues WHERE id=$1`,
    [id]
  )

  const issue = result.rows[0]

  if (!issue) return null

  const reporter = await pool.query(
    `SELECT id, name, role FROM users WHERE id=$1`,
    [issue.reporter_id]
  )

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporter.rows[0],
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }
}

const updateIssue = async (id: string, payload: any, user: any) => {
  const issueRes = await pool.query(
    `SELECT * FROM issues WHERE id=$1`,
    [id]
  )

  const issue = issueRes.rows[0]

  if (!issue) return null

  if (user.role === "contributor" && issue.reporter_id !== user.id) {
    throw new Error("Not your issue")
  }

  if (user.role === "contributor" && issue.status !== "open") {
    throw new Error("Cannot edit non-open issue")
  }

  const { title, description, type, status } = payload

  const result = await pool.query(
    `UPDATE issues
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         type = COALESCE($3, type),
         status = COALESCE($4, status),
         updated_at = CURRENT_TIMESTAMP
     WHERE id=$5
     RETURNING *`,
    [title, description, type, status, id]
  )

  return result.rows[0]
}

const deleteIssue = async (id: string, user: any) => {
  const issueRes = await pool.query(
    `SELECT * FROM issues WHERE id=$1`,
    [id]
  )

  const issue = issueRes.rows[0]

  if (!issue) return false

  if (user.role !== "maintainer") {
    throw new Error("Forbidden")
  }

  await pool.query(
    `DELETE FROM issues WHERE id=$1`,
    [id]
  )

  return true
}

export const issueService = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
}