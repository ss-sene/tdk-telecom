import { ImageResponse } from 'next/og';

export const alt         = 'TDK Telecom — Internet Haut Débit au Sénégal';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background:     '#1A3C9F',
                    width:          '100%',
                    height:         '100%',
                    display:        'flex',
                    flexDirection:  'column',
                    padding:        '72px 80px',
                }}
            >
                {/* Eyebrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', display: 'flex' }} />
                    <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: '22px', fontWeight: 600, display: 'flex' }}>
                        Disponible au Sénégal · Installation accompagnée
                    </span>
                </div>

                {/* Title */}
                <div style={{ color: '#ffffff', fontSize: '84px', fontWeight: 900, lineHeight: 1, marginBottom: '20px', display: 'flex' }}>
                    TDK Telecom
                </div>

                {/* Subtitle */}
                <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: '40px', fontWeight: 500, lineHeight: 1.3, marginBottom: '56px', display: 'flex' }}>
                    Internet Haut Débit au Sénégal
                </div>

                {/* Feature tags */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    {['10 000 FCFA / mois', 'Wave & Orange Money', 'Activation sous 24 h'].map((label) => (
                        <div
                            key={label}
                            style={{
                                background:   'rgba(255,255,255,0.14)',
                                borderRadius: '12px',
                                padding:      '12px 24px',
                                color:        'rgba(255,255,255,0.90)',
                                fontSize:     '22px',
                                fontWeight:   600,
                                display:      'flex',
                            }}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* URL — bottom right */}
                <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '24px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '22px', display: 'flex' }}>
                        tdk-telecom.com
                    </span>
                </div>
            </div>
        ),
        { width: 1200, height: 630 },
    );
}
