import Image from "components/image"
import Settings from "content/settings/settings.md"

export default function Logo({ logo = true }) {
    const logoSettings = Settings.data.logo
    if (!logo) return null
    console.log(logoSettings)
    let Text = () => null
    let Img = () => null

    if (logoSettings.textinlogo) {
        Text = () => (
            <h1 className={logoSettings.text_classname}>{logoSettings.text}</h1>
        )
    }

    if (logoSettings.imageinlogo) {
        Img = () => (
            <Image
                className={logoSettings.image_classname}
                src={logoSettings.image}
                alt={logoSettings.alt}
                layout={logoSettings.layout}
                width={logoSettings.width}
                height={logoSettings.height}
            />
        )
    }

    return (
        <div id="logo" className={logoSettings.logo_classname}>
            <Img />
            <Text />
        </div>
    )
}
