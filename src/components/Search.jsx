import { Search } from "lucide-react";
import { useState } from "react";

function Searchh({ onSearch }){

    const [searchActive, setSearchActive] = useState(false)
    return(
            <div className="search">
                <div>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-white/50" />

                    <input 
                        type="text"
                        onFocus={() => setSearchActive(true)} 
                        placeholder="Search through millions of movies"
                        onBlur={() => {
                            if (!query) setSearchActive(false)
;                        }}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
            </div>
    )
}
export default Searchh;