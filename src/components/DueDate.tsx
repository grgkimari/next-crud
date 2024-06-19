function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

function formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export default function DueDate({dueDate} : {dueDate? : Date}){
    return <div className="w-40 h-10 border-2 border-yellow-300 bg-yellow-100 flex justify-center items-center">{dueDate? formatDate(dueDate) : null}</div>
}