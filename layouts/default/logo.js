import Image from "components/image"
import Settings from "content/settings/settings.md"

export default function Logo({ logo = true }) {
    const logoSettings = Settings.data.logo
    if (!logo) return null
    console.log(logoSettings)
    let Text = null
    let Img = null

    if (logoSettings.textinlogo) {
        Text = () => <h1>{logoSettings.text}</h1>
    }

    if (logoSettings.imageinlogo) {
        Img = () => (
            <Image
                src={logoSettings.image}
                alt={logoSettings.alt}
                layout={logoSettings.layout}
                width={logoSettings.width}
                height={logoSettings.height}
                objectFit="cover"
                objectPosition="center center"
            />
        )
    }

    return (
        <div id="logo" className="flex flex-col overflow-hidden">
            <Img />
            <Text />
        </div>
    )
}
