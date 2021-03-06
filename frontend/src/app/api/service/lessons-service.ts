import { CancelSource, RestService } from 'app/api/common';

class LessonsService {

    private static readonly ROLE_LESSON_PATH: string = '/roleLessons';
    private static readonly SCHEDULE_PATH: string = '/schedule';

    private readonly restService: RestService;

    constructor(cancelSource: CancelSource = new CancelSource()) {
        this.restService = cancelSource.service;
    }

    public readonly getRoleLessons = (): Promise<Api.LessonDto[]> =>
        this.restService.get<Api.LessonDto[]>(`${LessonsService.ROLE_LESSON_PATH}`);

    public readonly getSchedule = (): Promise<Api.ScheduleDto[]> =>
        this.restService.get<Api.ScheduleDto[]>(`${LessonsService.SCHEDULE_PATH}`);

    public readonly getSocketUrl = (): string => {
        const loc = window.location;

        return (loc.host === 'localhost:3000') ? 'ws://localhost:8080/ws/currentLesson'
            : 'wss://java-menuo-su-it.northeurope.cloudapp.azure.com/ws/currentLesson';
    };
}

const lessonsService = new LessonsService();

export { lessonsService };
