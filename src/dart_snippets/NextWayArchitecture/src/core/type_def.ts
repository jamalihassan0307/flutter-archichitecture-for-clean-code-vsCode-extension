export class type_def {
  public static fileTemplates: { [key: string]: string } = {
    type_def: ` import '../../../../src/core/failure.dart';
import 'package:fpdart/fpdart.dart';

typedef FutureEither<T> = Future<Either<Failure, T>>;
typedef FutureVoid = Future<void>;


`,
  };
}
