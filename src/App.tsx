import 'bulma/css/bulma.min.css';
import { useState } from 'react';
import "./app.css";
import sources from "./data";

export default () => {
    const [searchKey, setSearchKey] = useState('')
    const [results, setResults] = useState<Boolean | any[]>(false)

    const search = () => {
        if (searchKey === '') { return }
        let results = []
        for (let x = 0; x < sources.length; x++) {
            const source = sources[x];
            let sKs = searchKey.split(' ');
            let matches = 0
            for (let y = 0; y < sKs.length; y++) {
                const sK = sKs[y].toLowerCase();
                let noOc = source.data.toLowerCase().split(sK).length - 1
                matches = matches + noOc
            }
            if (matches > 0) {
                results.push({ matches, source })
            }
        }
        results = results.sort((a, b) => (b.matches - a.matches))
        console.log(results)
        results = results.map((r) => (r.source))
        setResults(results);
    }
    const handleKeyPress = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            search()
        }
    }
    return (
        <div className='main'>
            {!results ?
                <div className="box searchbox">
                    <h1 className="title">LASU search engine</h1>
                    <input type="text" className="input is-info" onChange={(e) => setSearchKey(e.target.value)} value={searchKey} onKeyPress={handleKeyPress} />
                    <br />
                    <button onClick={() => search()} className="button is-info is-medium">Search</button>
                </div>
                : <div className="results">
                    <h1 className="title">LASU search engine</h1>
                    <div className="r-search">
                        <input type="text" className="input is-info is-medium" onChange={(e) => setSearchKey(e.target.value)} value={searchKey} onKeyPress={handleKeyPress} />
                        <button onClick={() => search()} className="button is-info is-medium">Search</button>
                    </div>
                    <div className="hr"></div>
                    {/* @ts-ignore */}
                    {((typeof results == 'object') && results.length > 0) ? results?.map((r: any) => (
                        <a href={r.url} target="_blank" key={r.url}>
                            <div className="result content">
                                <a href={r.url} target="_blank">{r.url}</a>
                                <h3>{r.title}</h3>
                                <p>{r.content}</p>
                            </div>
                        </a>
                    ))
                        : <div className="no-content">
                            <p>No results found</p>
                        </div>
                    }
                </div>
            }
        </div >
    )
}
