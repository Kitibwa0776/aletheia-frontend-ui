import { useState } from "react";
import { UploadCloud } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";

export default function UploadPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Upload report"
        subtitle="Add a new report package for review and compliance analysis."
      />

      <form className="form-grid" onSubmit={handleSubmit}>
        <section className="panel">
          <label>
            Project name
            <input placeholder="Enter project name" required />
          </label>

          <label>
            Document type
            <select required>
              <option value="">Select type</option>
              <option>Environmental Report</option>
              <option>Geological Summary</option>
              <option>Inspection Response</option>
              <option>Community Engagement Record</option>
            </select>
          </label>

          <label>
            Submission notes
            <textarea
              rows="5"
              placeholder="Briefly describe what was uploaded and what should be reviewed."
            />
          </label>
        </section>

        <section className="panel">
          <div className="upload-dropzone">
            <UploadCloud size={28} />
            <strong>Drag and drop files here</strong>
            <p>PDF, DOCX, XLSX, and image uploads can be added later.</p>
            <button type="button" className="ghost-button">
              Browse files
            </button>
          </div>

          <div className="inline-fields">
            <label>
              Reviewer
              <input placeholder="Assign reviewer" />
            </label>

            <label>
              Due date
              <input type="date" />
            </label>
          </div>

          {submitted ? (
            <div className="form-message success">
              Mock upload submitted successfully.
            </div>
          ) : null}

          <button className="primary-button" type="submit">
            Submit upload
          </button>
        </section>
      </form>
    </AppLayout>
  );
}
