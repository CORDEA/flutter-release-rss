import fetch from 'node-fetch'

const urls = [
    'https://storage.googleapis.com/flutter_infra_release/releases/releases_windows.json',
    'https://storage.googleapis.com/flutter_infra_release/releases/releases_macos.json',
    'https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json'
]

for (const url in urls) {
    const response = await fetch(url)
    const data = await response.json()
}
