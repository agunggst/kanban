const a = [
    {
        title: 'Membuat Todo Backlog',
        category: 'Backlog',
        description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Backlog'
    },
    {
        title: 'Membuat Todo Todo',
        category: 'Todo',
        description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Todo'
    },
    {
        title: 'Membuat Todo Done',
        category: 'Done',
        description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Done'
    },
    {
        title: 'Membuat Todo Completed',
        category: 'Completed',
        description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Completed'
    },
    {
        title: 'Membuat Todo Backlog',
        category: 'Backlog',
        description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Backlog'
    },
    {
        title: 'Membuat Todo Done',
        category: 'Done',
        description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Done'
    }
]

let b = a.filter( (data) => data.category == 'Backlog' )
console.log(b)