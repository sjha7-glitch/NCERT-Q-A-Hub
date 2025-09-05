import sql from '@/app/api/utils/sql';

export async function GET(request, { params }) {
  try {
    const { classId, subjectId, chapterId } = params;

    const questions = await sql`
      SELECT q.id, q.question_number, q.question_text, q.answer_text, 
             q.difficulty_level, ch.name as chapter_name
      FROM questions q
      INNER JOIN chapters ch ON q.chapter_id = ch.id
      INNER JOIN class_subjects cs ON ch.class_subject_id = cs.id
      INNER JOIN classes c ON cs.class_id = c.id
      INNER JOIN subjects s ON cs.subject_id = s.id
      WHERE c.class_number = ${parseInt(classId)} 
        AND s.slug = ${subjectId}
        AND ch.chapter_number = ${parseInt(chapterId)}
      ORDER BY q.question_number
    `;

    return Response.json({ success: true, data: questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return Response.json({ success: false, error: 'Failed to fetch questions' }, { status: 500 });
  }
}