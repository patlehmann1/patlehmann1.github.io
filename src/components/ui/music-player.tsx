interface MusicPlayerProps {
  embedUrl: string;
  title?: string;
  description?: string;
  height?: number;
}

export function MusicPlayer({
  embedUrl,
  title,
  description,
  height = 450,
}: MusicPlayerProps) {
  return (
    <div className="w-full">
      {title && <h4 className="font-semibold mb-3 text-primary">{title}</h4>}
      {description && <p className="text-body text-muted-foreground mb-4">{description}</p>}
      <div className="w-full" style={{ maxWidth: '660px' }}>
        <iframe
          allow="autoplay *; encrypted-media *;"
          frameBorder="0"
          height={height}
          style={{
            width: '100%',
            maxWidth: '660px',
            overflow: 'hidden',
            background: 'transparent',
          }}
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src={embedUrl}
          title={title || "Apple Music Player"}
          loading="lazy"
        />
      </div>
    </div>
  );
}
