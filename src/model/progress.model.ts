import { UserModel } from "./user.model";

export class ProgressModel{
  id: Number;
  height: Number;
  weight: Number;
  headCircumference: Number;
  dateTrack: Date;
  user: UserModel;
}
