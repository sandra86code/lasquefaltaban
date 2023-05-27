export interface QuestionsResponse {
    id:                 number;
    name:               string;
    woman:              Woman;
    category:           Category;
    answers:            Answer[];
}

export interface Answer {
    id:      number;
    answer:  string;
    correct: boolean;
}


export interface Category {
    id:   number;
    name: string;
}


export interface Woman {
    id:          number;
    name:        string;
    description: string;
}
