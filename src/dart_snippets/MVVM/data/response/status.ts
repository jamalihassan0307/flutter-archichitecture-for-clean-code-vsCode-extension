export class status {
  public static fileTemplates: { [key: string]: string } = {
    status: ` 
enum Status { notStarted,loading, completed, error}
`,
  };
}
