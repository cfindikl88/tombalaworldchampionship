
import re

file_path = '/Users/caglarfindikli/Tombala_World_Championship_v4/js/countries.js'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
current_continent = ""

continent_map = {
    "Americas": "Amerika",
    "Europe": "Avrupa",
    "Asia": "Asya",
    "Africa": "Afrika",
    "Oceania & Others": "Okyanusya"
}

for line in lines:
    # Detect continent headers
    if "// Americas" in line:
        current_continent = "Americas"
    elif "// Europe" in line:
        current_continent = "Europe"
    elif "// Asia" in line:
        current_continent = "Asia"
    elif "// Africa" in line:
        current_continent = "Africa"
    elif "// Oceania" in line:
        current_continent = "Oceania"
    
    # Process data lines
    if "{ id:" in line and "continent:" not in line:
        # Inject continent after id
        # pattern: { id: "USA", 
        # replacement: { id: "USA", continent: "Americas", 
        
        # We can just inject it after the opening brace
        # But let's put it after 'id: "XYZ",' to be clean? 
        # Or before 'name:'. 
        # pattern: id: "(\w+)",
        
        match = re.search(r'id: "([^"]+)",', line)
        if match and current_continent:
            # Insert continent property
            insertion = f' continent: "{current_continent}",'
            # insertion point: after the id value comma
            end_idx = match.end()
            line = line[:end_idx] + insertion + line[end_idx:]
            
    new_lines.append(line)

# Update getRandomCountries function
# We need to find the function and replace it
# It starts around line 144
code_content = "".join(new_lines)

new_function = """export function getRandomCountries(count = 32) {
    // Continent quotas for 32 teams (Total: 32)
    // Europe: 8, Asia: 8, Africa: 8, Americas: 5, Oceania: 3
    const quotas = {
        "Europe": 8,
        "Asia": 8,
        "Africa": 8,
        "Americas": 5,
        "Oceania": 3
    };

    if (count === 32) {
        let selected = [];
        const regions = ["Europe", "Asia", "Africa", "Americas", "Oceania"];
        
        // Select for each region
        regions.forEach(region => {
            const regionCountries = COUNTRIES.filter(c => c.continent === region);
            const shuffled = [...regionCountries].sort(() => Math.random() - 0.5);
            const quota = quotas[region];
            selected = selected.concat(shuffled.slice(0, quota));
        });

        // Add remaining if any (shouldn't be needed if data is correct, but safety net)
        if (selected.length < count) {
            const remaining = COUNTRIES.filter(c => !selected.includes(c));
            const shuffledRemaining = [...remaining].sort(() => Math.random() - 0.5);
            selected = selected.concat(shuffledRemaining.slice(0, count - selected.length));
        }

        // Final shuffle
        return selected.sort(() => Math.random() - 0.5);
    }

    // Default behavior for other counts
    const shuffled = [...COUNTRIES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}"""

# Replace the old function
# Find range of old function
start_marker = "export function getRandomCountries(count = 32) {"
end_marker = "}"
# This is risky with simple replace if there are nested braces, but the function is simple.
# It ends at line 148 approx.

# Let's just find the start and the next closing brace at column 0? 
# Or just replace the known block.
# The original block:
# export function getRandomCountries(count = 32) {
#     const shuffled = [...COUNTRIES].sort(() => Math.random() - 0.5);
#     return shuffled.slice(0, count);
# }

original_func = """export function getRandomCountries(count = 32) {
    const shuffled = [...COUNTRIES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}"""

if original_func in code_content:
    code_content = code_content.replace(original_func, new_function)
else:
    # Fallback if whitespace differs
    print("Function replace failed due to mismatch")

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code_content)
