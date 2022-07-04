// Returns a random number between min(inclusive) and max(inclusive)
export function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const types = {
    case: 'Case',
    psu: 'Power Supply Unit',
    motherboard: 'Motherboard',
    cpu: 'CPU',
    ram: 'RAM',
    ssd: 'Solid State Drive (SSD)',
    hdd: 'Hard Disk',
    gpu: 'Graphics Card (GPU)',
    cooling: 'Cooling & Fans'
}