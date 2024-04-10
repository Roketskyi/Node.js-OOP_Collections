class Student {
    static nextId = 1;

    constructor(name, group) {
        this.id = Student.nextId++;
        this.name = name;
        this.groupName = group.name;
    }

    changeName(newName) {
        this.name = newName;
    }
}

class Group {
    constructor(name) {
        this.name = name;
        this.students = [];
    }

    addStudent(student) {
        this.students.push(student);
    }

    removeStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
    }

    getStudents() {
        return this.students.map(student => ({
            id: student.id,
            name: student.name
        }));
    }

    getStudentsCount() {
        return this.students.length;
    }
}

class University {
    constructor() {
        this.groups = [];
    }

    addGroup(group) {
        this.groups.push(group);
    }

    removeGroup(name) {
        this.groups = this.groups.filter(group => group.name !== name);
        this.groups.forEach(group => {
            group.students = group.students.filter(student => student.groupName !== name);
        });
    }

    getGroupStudents(groupName) {
        const group = this.groups.find(group => group.name === groupName);
        if (group) {
            return group.getStudents();
        } else {
            return [];
        }
    }

    getTotalStudentsCount() {
        let total = 0;
        this.groups.forEach(group => {
            total += group.getStudentsCount();
        });
        return total;
    }
}

// Приклад використання:

const university = new University();

const group1 = new Group("ІПЗс-22-2");
const group2 = new Group("Дс-21-1");

university.addGroup(group1);
university.addGroup(group2);

const student1 = new Student("Рокетський Роман", group1);
const student2 = new Student("Дуткевич Віктор", group1);
const student3 = new Student("Білик Аліна", group2);

group1.addStudent(student1);
group1.addStudent(student2);
group2.addStudent(student3);

console.log("Список студентів у групі ІПЗс-22-2:", university.getGroupStudents("ІПЗс-22-2"));
console.log("Список студентів у групі Дс-21-1:", university.getGroupStudents("Дс-21-1"));

student1.changeName("Якийсь_Там Петро");

console.log(`\n-------------------\n`)
console.log("Список студентів у групі ІПЗс-22-2 після зміни імені:", university.getGroupStudents("ІПЗс-22-2"));

university.removeGroup("ІПЗс-22-2");
console.log("Список студентів у групі ІПЗс-22-2 після видалення групи:", university.getGroupStudents("ІПЗс-22-2"));

console.log("Кількість студентів в університеті на даний момент:", university.getTotalStudentsCount());
