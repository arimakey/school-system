export interface Section {
  _id?: string;
  name: string;
  gradeId: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Grade {
  _id?: string;
  name: string;
  levelId: string;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}

export interface Level {
  _id?: string;
  name: string;
  grades: Grade[];
  createdAt: string;
  updatedAt: string;
}
