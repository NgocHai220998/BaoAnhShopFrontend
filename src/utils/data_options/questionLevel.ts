interface QuestionLevelType {
  level: string;
  description: string;
}

export const questionLevels: QuestionLevelType[] = [{
  level: "N1",
  description: "Cấp độ N1"
}, {
  level: "N2",
  description: "Cấp độ N2"
}, {
  level: "N3",
  description: "Cấp độ N3"
}, {
  level: "N4",
  description: "Cấp độ N4"
}, {
  level: "N5",
  description: "Cấp độ N5"
}, {
  level: "Other",
  description: "Chưa xác định"
}]


export const convertLevelToDescriptionQL = (key: string = "Other"): string => {
  switch (key) {
    case "N1":
      return "Cấp độ N1";
    case "N2":
      return "Cấp độ N2";
    case "N3":
      return "Cấp độ N3";
    case "N4":
      return "Cấp độ N4";
    case "N5":
      return "Cấp độ N5";
    default:
      return "Chưa xác định";
  }
}
