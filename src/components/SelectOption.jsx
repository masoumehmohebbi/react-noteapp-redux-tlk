import Select from 'react-select';

export default function SelectOption({ selectedOption, setSelectedOption }) {
  const options = [
    { value: 'خانه', label: 'خانه' },
    { value: 'کار', label: 'کار' },
    { value: 'شخصی', label: 'شخصی' },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  return (
    <Select
      styles={{
        control: () => ({
          display: 'flex',
          borderRadius: '5px',
          padding: '3px',
          backgroundColor: '#f3e8ff',
        }),
        option: (_, state) => ({
          padding: '10px',
          color: '#000',
          backgroundColor: state.isFocused ? '#d8b4fe' : '#ffffff',
        }),
      }}
      className="col-span-9 md:col-span-3 shadow-md border border-[#d8b4fe] rounded-md"
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder="دسته بندی"
    />
  );
}
