export default async function Page() {
    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    await delay(1000);
    return (<>works</>)
}