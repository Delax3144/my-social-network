import type { User } from "../types/user";

export const users: User[] = [
    {
        id: "vasiliy",
        username: "Delax314",
        name: "Василий Триндюк",
        initials: "ВТ",
        bio: "Учусь создавать интерфейсы. Собираю маленькие открытия, мысли и наблюдения по дороге.",
    },
    { id: "anna", username: "Anna", name: "Anna", initials: "А", bio: "Изучаю React и делюсь заметками." },
    { id: "alena", username: "Alena", name: "Alena", initials: "А", bio: "Записываю то, что хочется запомнить." },
    { id: "alexandr", username: "Alexandr", name: "Alexandr", initials: "А", bio: "Небольшие заметки о повседневном." },
];

export const currentUser = users[0];
