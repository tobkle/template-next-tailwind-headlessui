export default function LogoMobile({ logo }) {
    if (!logo) return null
    return (
        <div>
            <img className="h-8 w-auto" src="/img/vercel.svg" alt="Workflow" />
        </div>
    )
}
