import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ExcludeNullInterceptorInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      // just add in middle
      .pipe(map(value => recursivelyStripNullValues(value)));
    // just add in middle
  }
}

/*  * we recursively travel the data structure and preserve values only if they differ from null. 
    * It works both for arrays and plain objects.
*   */

function recursivelyStripNullValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key, recursivelyStripNullValues(value)])
    );
  }
  if (value !== null) {
    return value;
  }
}