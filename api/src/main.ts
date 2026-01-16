import { prisma } from "./libs/prisma.js"

async function main() {
    const data = await prisma.gameSession.deleteMany({})
    console.log(data)
}

main();