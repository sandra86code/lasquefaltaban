export interface QuestionsResponse {
    id:                 number;
    name:               string;
    woman:              Woman;
    questioncategories: Questioncategory[];
    answers:            Answer[];
}

export interface Answer {
    id:      number;
    answer:  string;
    correct: boolean;
}

export interface Questioncategory {
    category: Category;
}

export interface Category {
    id:   number;
    name: Name;
}

export enum Name {
    Ciencia = "Ciencia",
    Cultura = "Cultura",
    Deporte = "Deporte",
    Historia = "Historia",
}

export interface Woman {
    id:          number;
    name:        string;
    description: string;
    img:         null;
}
