import { ICourse } from '@micro/interfaces';

export namespace CourseGetCourse {
  export const topic = 'course.get-course.query';

  export class Request {
    id!: string;
  }

  export class Response {
    course!: ICourse;
  }
}
