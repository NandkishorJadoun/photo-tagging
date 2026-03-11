import { prisma } from "../libs/prisma.js"

const data = [{ name: "waldo", x: 0.4, y: 0.63 }, { name: "odlaw", x: 0.07, y: 0.69 }, { name: "wizard", x: 0.78, y: 0.58 }]

const main = async () => {
    await prisma.character.createMany({
        data: data
    })
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
