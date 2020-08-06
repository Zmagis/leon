import { CancelSource, RestService } from 'app/api/common';

class LessonsService {

    private static readonly TEACHER_LESSON_PATH: string = '/teacherLessons';
    private static readonly STUDENT_LESSON_PATH: string = '/studentLessons';

    private readonly restService: RestService;

    constructor(cancelSource: CancelSource = new CancelSource()) {
        this.restService = cancelSource.service;
    }

    public readonly getTeacherLessons = (): Promise<Api.Lesson[]> =>
        this.restService.get<Api.Lesson[]>(`${LessonsService.TEACHER_LESSON_PATH}`);

    public readonly getStudentLessons = (): Promise<Api.Lesson[]> =>
        this.restService.get<Api.Lesson[]>(`${LessonsService.STUDENT_LESSON_PATH}`);

}

const lessonsService = new LessonsService();

export { lessonsService };
