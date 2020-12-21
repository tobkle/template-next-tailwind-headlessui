import Container from "./container"

export default function Footer({ footer = true }) {
    if (!footer) return null
    return (
        <footer>
            <Container>Footer</Container>
        </footer>
    )
}
