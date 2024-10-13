 import '../../../../src/core/failure.dart';
import 'package:fpdart/fpdart.dart';
import 'core.ts';

typedef FutureEither<T> = Future<Either<Failure, T>>;
typedef FutureVoid = Future<void>;


