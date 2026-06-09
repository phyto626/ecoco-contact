import { ContentEditor } from "@/components/admin/ContentEditor";
import { getCases, getContent } from "@/lib/google-sheets";

export default async function EditorPage() {
  const [content, cases] = await Promise.all([getContent(), getCases()]);

  return (
    <div className="admin-grid">
      <div>
        <h1 className="admin-page-title">前台內容編輯器</h1>
        <p className="muted">調整 Hero、Footer 與案例展示，儲存後前台會讀取最新內容。</p>
      </div>
      <ContentEditor content={content} cases={cases} />
    </div>
  );
}
