import UrlEdit from "./url-edit";

export default async function ReceiptsIdPage(
    { params }: 
        { params: Promise<{ url: string }> }
) {
    const { url } = await params;
    
    return (
        <div>
          <UrlEdit 
            shortenedUrl={url}
          />
        </div>
    );
};