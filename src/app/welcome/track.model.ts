export interface Groups {
    id: string;
    title: string;
}

export interface Track {
    subject : {
        name: string;
        image : string[];
        groups: Groups[];
    }
}