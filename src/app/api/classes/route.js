import sql from '@/app/api/utils/sql';

export async function GET() {
  try {
    const classes = await sql`
      SELECT c.*, 
             COUNT(DISTINCT cs.subject_id) as subjects_count,
             COALESCE(SUM(cs.questions_count), 0) as total_questions
      FROM classes c
      LEFT JOIN class_subjects cs ON c.id = cs.class_id
      GROUP BY c.id, c.class_number, c.name, c.description, c.created_at
      ORDER BY c.class_number
    `;

    return Response.json({ success: true, data: classes });
  } catch (error) {
    console.error('Error fetching classes:', error);
    return Response.json({ success: false, error: 'Failed to fetch classes' }, { status: 500 });
  }
}