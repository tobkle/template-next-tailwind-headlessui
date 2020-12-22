export default function LogoDesktop({ logo = false }) {
    if (!logo) return null
    return (
        <div className="flex items-center flex-shrink-0 px-4">
            <img className="h-8 w-auto" src="/img/vercel.svg" alt="Workflow" />
        </div>
    )
}
