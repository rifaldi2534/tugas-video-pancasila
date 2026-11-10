"""
Generate Voice Acting MP3 files for animatic dialogue using edge-tts.
"""
import os
import json
import asyncio
import edge_tts

CHARACTER_VOICES = {
    "hendro": {
        "voice": "jv-ID-DimasNeural",
        "rate": "-5%",
        "pitch": "-4Hz",  # Suara agak berat, lelah
    },
    "aryo": {
        "voice": "id-ID-ArdiNeural",
        "rate": "+0%",
        "pitch": "-2Hz",  # Tegas, berwibawa, koordinator
    },
    "nadia": {
        "voice": "id-ID-GadisNeural",
        "rate": "+2%",
        "pitch": "+2Hz",  # Cermat, teliti, wanita
    },
    "kevin": {
        "voice": "id-ID-ArdiNeural",
        "rate": "+8%",
        "pitch": "+4Hz",  # Cepat, panik, IT/portal
    },
    "dimas": {
        "voice": "jv-ID-DimasNeural",
        "rate": "+6%",
        "pitch": "+2Hz",  # Ambisius, menuntut, tegas
    },
    "bagas": {
        "voice": "jv-ID-DimasNeural",
        "rate": "-8%",
        "pitch": "-6Hz",  # Lemah, serak, lelah
    },
    "fajar": {
        "voice": "id-ID-ArdiNeural",
        "rate": "+0%",
        "pitch": "-1Hz",
    },
    "rere": {
        "voice": "jv-ID-SitiNeural",
        "rate": "+4%",
        "pitch": "+3Hz",
    },
}

async def generate_line(speaker_id: str, text: str, output_path: str):
    cfg = CHARACTER_VOICES.get(speaker_id.lower(), {
        "voice": "id-ID-ArdiNeural",
        "rate": "+0%",
        "pitch": "+0Hz"
    })
    communicate = edge_tts.Communicate(
        text=text,
        voice=cfg["voice"],
        rate=cfg["rate"],
        pitch=cfg["pitch"]
    )
    await communicate.save(output_path)
    print(f"Generated: {output_path} ({speaker_id})")

async def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    animatic_dir = os.path.dirname(script_dir)
    scenes_path = os.path.join(animatic_dir, "src", "data", "scenes.json")
    
    with open(scenes_path, "r", encoding="utf-8") as f:
        scenes = json.load(f)

    scene1 = scenes[0]
    out_dir = os.path.join(animatic_dir, "public", "audio", "dialogue", "scene01")
    os.makedirs(out_dir, exist_ok=True)

    for dl in scene1["dialogueLines"]:
        dl_id = dl["id"]
        speaker = dl["speakerId"]
        text = dl["textOriginal"]
        out_file = os.path.join(out_dir, f"{dl_id}.mp3")
        await generate_line(speaker, text, out_file)

    print("All Scene 1 dialogue lines generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
