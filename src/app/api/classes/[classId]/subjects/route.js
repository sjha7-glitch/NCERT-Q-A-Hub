import sql from '@/app/api/utils/sql';

export async function GET(request, { params }) {
  try {
    const { classId } = params;

    const subjects = await sql`
      SELECT s.id, s.name, s.slug, 
             cs.chapters_count, cs.questions_count
      FROM subjects s
      INNER JOIN class_subjects cs ON s.id = cs.subject_id
      INNER JOIN classes c ON cs.class_id = c.id
      WHERE c.class_number = ${parseInt(classId)}
      ORDER BY s.name
    `;

    return Response.json({ success: true, data: subjects });
  } catch (error) {
    console.error('Error fetching subjects for class:', error);
    return Response.json({ success: false, error: 'Failed to fetch subjects' }, { status: 500 });
  }
}