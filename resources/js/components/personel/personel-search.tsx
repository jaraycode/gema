interface PersonelSearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export function PersonelSearch({ searchTerm, onSearchChange }: PersonelSearchProps) {
    return (
        <div className="flex items-center py-4">
            <div className="relative w-full max-w-full rounded-xl">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z" />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Buscar Personal..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full rounded-full border border-gray-100 bg-gray-100 py-2 pr-4 pl-10 text-gray-700 placeholder-gray-500 ring-0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
        </div>
    );
}
