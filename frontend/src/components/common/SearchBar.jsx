import SearchIcon from '../../assets/icons/SearchIcon'

const SearchBar = ({ handleSearch, searchData, setSearchData, placeholder, autoFocus }) => {
    return (
        <div className='relative text-center'>
            <SearchIcon className='absolute bottom-2 left-5' />
            <input value={searchData} onChange={handleSearch} autoFocus={autoFocus} className='w-full bg-search py-2 ps-[55px] pe-4 mt-6 border border-gray rounded-lg outline-blue' type="search" placeholder={placeholder} />
        </div>
    )
}
export default SearchBar