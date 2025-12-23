// Grade calculator utilities

export interface Exam {
  id: string;
  name: string;
  grade: number; // 18-31 (31 = 30L)
  cfu: number;
}

export interface GradeStats {
  weightedAvg: number;
  arithmeticAvg: number;
  totalCfu: number;
  totalExams: number;
}

export const calculateGradeStats = (exams: Exam[]): GradeStats => {
  if (exams.length === 0) {
    return { weightedAvg: 0, arithmeticAvg: 0, totalCfu: 0, totalExams: 0 };
  }

  const totalCfu = exams.reduce((sum, exam) => sum + exam.cfu, 0);
  const weightedSum = exams.reduce((sum, exam) => {
    const gradeValue = exam.grade > 30 ? 30 : exam.grade;
    return sum + (gradeValue * exam.cfu);
  }, 0);
  const arithmeticSum = exams.reduce((sum, exam) => {
    const gradeValue = exam.grade > 30 ? 30 : exam.grade;
    return sum + gradeValue;
  }, 0);

  return {
    weightedAvg: weightedSum / totalCfu,
    arithmeticAvg: arithmeticSum / exams.length,
    totalCfu,
    totalExams: exams.length
  };
};

export const countLodi = (exams: Exam[]): number => {
  return exams.filter(e => e.grade === 31).length;
};

export const getGradeOptions = (): { value: string; label: string }[] => {
  const options = [];
  for (let i = 18; i <= 30; i++) {
    options.push({ value: i.toString(), label: i.toString() });
  }
  options.push({ value: "31", label: "30L" });
  return options;
};

export const getGradeDistribution = (exams: Exam[]): { grade: string; count: number }[] => {
  const grades = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  return grades
    .map(grade => ({
      grade: grade === 31 ? "30L" : grade.toString(),
      count: exams.filter(e => e.grade === grade).length
    }))
    .filter(item => item.count > 0);
};

export const getAvgBadgeVariant = (avg: number): "default" | "secondary" | "outline" => {
  if (avg >= 27) return "default";
  if (avg >= 24) return "secondary";
  return "outline";
};

export const simulateNewExam = (
  currentAverage: number,
  currentCfu: number,
  newGrade: number,
  newCfu: number
): { newAvg: number; difference: number } | null => {
  if (currentCfu === 0 || newCfu <= 0) return null;
  
  const gradeValue = newGrade > 30 ? 30 : newGrade;
  const totalWeightedSum = (currentAverage * currentCfu) + (gradeValue * newCfu);
  const totalCfu = currentCfu + newCfu;
  const newAvg = totalWeightedSum / totalCfu;

  return {
    newAvg,
    difference: newAvg - currentAverage
  };
};

export const calculateRequiredGrade = (
  currentAverage: number,
  currentCfu: number,
  targetAvg: number,
  remainingCfu: number
): number | null => {
  if (currentCfu === 0 || remainingCfu <= 0) return null;
  
  const totalCfuAfter = currentCfu + remainingCfu;
  return (targetAvg * totalCfuAfter - currentAverage * currentCfu) / remainingCfu;
};
