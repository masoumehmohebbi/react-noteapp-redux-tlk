function Note() {
  return (
    <div>
      <ProgressNote />
    </div>
  );
}

export default Note;

function ProgressNote() {
  return (
    <div className="flex flex-col my-9 gap-y-2">
      <span className="text-xl font-semibold">You have 1/3 notes completed</span>
      <div className="w-full h-1 bg-blue-200"></div>
    </div>
  );
}
