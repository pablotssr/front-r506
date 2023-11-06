export interface Diary {
    id: number;
    user_id: number;
    pet_id: number;
    pet_age: number;
    action_id: number;
    event_id: number | null;
}
