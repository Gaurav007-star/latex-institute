import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const article = `The Importance of Digital Literacy in a Connected World

In today's hyper-connected society, digital literacy has become as essential as traditional reading and writing. From navigating social platforms to safeguarding personal data, the ability to interact confidently and safely with digital tools shapes our opportunities, careers, and daily lives.

<h2>What Is Digital Literacy?</h2>

<p>Digital literacy refers to the skills and knowledge required to:</p>

<ul>
<li>Use digital devices and software</li>
<li>Find, evaluate, and share information online</li>
<li>Communicate effectively in digital spaces</li>
<li>Understand digital safety, privacy, and ethics</li>
</ul>

<p>It goes beyond basic computer use—digital literacy is about thinking critically, making informed decisions, and adapting to rapidly evolving technologies.</p>

<h2>Why It Matters</h2>

<h3>1. Workplace Readiness</h3>

<p>Nearly every industry now relies on digital platforms. Employers expect familiarity with collaborative tools, cloud-based systems, and digital communication. Strong digital skills open the door to more job opportunities and career advancement.</p>

<h3>2. Access to Information</h3>

<p>The internet is the largest information ecosystem in history. Being digitally literate enables individuals to sift through vast online content, distinguish credible sources, and avoid misinformation.</p>

<h3>3. Digital Citizenship</h3>

<p>With online interactions shaping social and political landscapes, digital literacy fosters responsible engagement. It encourages respectful communication, awareness of biases, and understanding of how personal data is collected and used.</p>

<h3>4. Personal Empowerment</h3>

<p>From online banking to virtual healthcare, digital services streamline everyday life. Those with strong digital skills can use these services efficiently and confidently, reducing barriers and enhancing independence.</p>

<h2>Building Digital Literacy Skills</h2>

<p>Here are practical ways to strengthen digital literacy:</p>

<ul>
<li>Practice critical thinking when evaluating online content.</li>
<li>Stay updated on new technologies, apps, and platforms.</li>
<li>Learn essential cybersecurity habits, such as using strong passwords and recognizing phishing attempts.</li>
<li>Engage in online communities to develop communication and collaboration skills.</li>
<li>Take free online courses offered by educational platforms and libraries.</li>
</ul>

<h2>Conclusion</h2>

<p>Digital literacy is no longer optional—it's a cornerstone of participation in modern society. By building these skills, individuals empower themselves to thrive in an increasingly digital world.</p>`;

const Article = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(article);
  const [originalContent] = useState(article);
  const editor = useRef(null);

  // Jodit editor configuration
  // const config = {
  //   readonly: false,
  //   placeholder: "Start writing your article here...",
  //   height: 500,
  //   buttons: [
  //     "bold",
  //     "italic",
  //     "underline",
  //     "strikethrough",
  //     "|",
  //     "ul",
  //     "ol",
  //     "|",
  //     "font",
  //     "fontsize",
  //     "brush",
  //     "paragraph",
  //     "|",
  //     "table",
  //     "link",
  //     "image",
  //     "|",
  //     "align",
  //     "undo",
  //     "redo",
  //     "|",
  //     "hr",
  //     "eraser",
  //     "fullsize",
  //   ],
  //   buttonsXS: [
  //     "bold",
  //     "italic",
  //     "underline",
  //     "|",
  //     "ul",
  //     "ol",
  //     "|",
  //     "undo",
  //     "redo",
  //   ],
  //   toolbarAdaptive: false,
  //   showCharsCounter: false,
  //   showWordsCounter: true,
  //   showXPathInStatusbar: false,
  // };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Here you would typically save to an API or database
    // console.log("Content saved:", content);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setContent(originalContent);
    setIsEditing(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Header with title and edit button when not editing */}
        {!isEditing && (
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Digital Literacy Article
            </h1>
            <button
              onClick={handleEditClick}
              className="bg-primary text-white px-4 py-3 rounded-xl font-medium cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              Edit Article
            </button>
          </div>
        )}

        {/* ─────── EDITING MODE ─────── */}
        {isEditing ? (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Article</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelClick}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Jodit Editor */}
            <div className="border overflow-hidden">
              <JoditEditor
                ref={editor}
                value={content}
                // config={config}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => {
                  // Optional: You can use onChange if you want real-time updates
                  // setContent(newContent);
                }}
              />
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <p>
                Tip: Use the toolbar above to format your text. The editor
                automatically saves formatting when you click outside.
              </p>
            </div>
          </div>
        ) : (
          /* ─────── VIEWING MODE ─────── */
          <div className="bg-white shadow-lg p-6 md:p-8 border">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;