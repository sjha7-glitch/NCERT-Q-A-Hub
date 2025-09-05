import sql from '@/app/api/utils/sql';

export async function GET(request, { params }) {
  try {
    const { classId, subjectId } = params;

    const chapters = await sql`
      SELECT ch.id, ch.chapter_number, ch.name, ch.description, ch.questions_count
      FROM chapters ch
      INNER JOIN class_subjects cs ON ch.class_subject_id = cs.id
      INNER JOIN classes c ON cs.class_id = c.id
      INNER JOIN subjects s ON cs.subject_id = s.id
      WHERE c.class_number = ${parseInt(classId)} 
        AND s.slug = ${subjectId}
      ORDER BY ch.chapter_number
    `;

    return Response.json({ success: true, data: chapters });
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return Response.json({ success: false, error: 'Failed to fetch chapters' }, { status: 500 });
  }
}