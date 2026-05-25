/* ── GRÁFICO ── */
const ctx = document.getElementById('methaneChart');

let methaneData = [35, 40, 42, 45, 41, 48];
let labels = ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'];

const methaneChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels,
        datasets: [{
            label: 'Metano (PPM)',
            data: methaneData,
            borderColor: '#1d4ed8',
            backgroundColor: 'rgba(29,78,216,0.10)',
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#1d4ed8'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#cbd5e1',
                    font: {
                        weight: '600',
                        family: 'Sora'
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#94a3b8'
                },
                grid: {
                    color: 'rgba(255,255,255,.06)'
                }
            },
            y: {
                ticks: {
                    color: '#94a3b8'
                },
                grid: {
                    color: 'rgba(255,255,255,.06)'
                }
            }
        }
    }
});

/* ── ATUALIZAÇÃO DO DASHBOARD ── */
function updateMethane() {

    const value = Math.floor(Math.random() * 40) + 30;

    const now = new Date();

    const timeLabel =
        now.getHours() + ':' +
        String(now.getMinutes()).padStart(2, '0');

    methaneData.push(value);
    methaneData.shift();

    labels.push(timeLabel);
    labels.shift();

    let datasetColor = '#1d4ed8';

    if (value >= 60) {
        datasetColor = '#dc2626';
    } else if (value >= 45) {
        datasetColor = '#d97706';
    }

    methaneChart.data.datasets[0].borderColor = datasetColor;

    methaneChart.data.datasets[0].backgroundColor =
        datasetColor.replace(')', ', 0.10)')
        .replace('rgb', 'rgba');

    methaneChart.update();

    document.getElementById('ppm-value').textContent =
        value + ' PPM';

    const statusEl =
        document.getElementById('ppm-status');

    const dashCard =
        document.getElementById('main-dashboard-card');

    const alertTitle =
        document.getElementById('alert-level-title');

    const alertDesc =
        document.getElementById('alert-level-desc');

    if (value < 45) {

        statusEl.textContent = 'Nível Moderado';
        statusEl.style.color = '#1d4ed8';

        document.body.classList.remove('critical-alert');

        dashCard.classList.remove('alert-critical');

        alertTitle.textContent = '✅ Nível Normal';
        alertTitle.style.color = '#16a34a';

        alertDesc.textContent =
            'Concentração dentro dos parâmetros aceitáveis';

    } else if (value < 60) {

        statusEl.textContent = 'Nível Elevado';
        statusEl.style.color = '#d97706';

        document.body.classList.remove('critical-alert');

        dashCard.classList.remove('alert-critical');

        alertTitle.textContent = '⚠️ Nível Elevado';
        alertTitle.style.color = '#d97706';

        alertDesc.textContent =
            'Atenção: concentração acima do padrão esperado';

    } else {

        statusEl.textContent = '⚠ ALERTA CRÍTICO';
        statusEl.style.color = '#dc2626';

        document.body.classList.add('critical-alert');

        dashCard.classList.add('alert-critical');

        alertTitle.textContent = '🚨 ALERTA CRÍTICO';
        alertTitle.style.color = '#dc2626';

        alertDesc.textContent =
            'Concentração perigosa detectada — resposta imediata necessária!';
    }
}

setInterval(updateMethane, 3000);

/* ── NAVBAR SCROLL ── */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle(
        'scrolled',
        window.scrollY > 60
    );
}, {
    passive: true
});

/* ── REVEAL ON SCROLL ── */
const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry, i) => {

        if (entry.isIntersecting) {

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 70);

            observer.unobserve(entry.target);
        }
    });

}, {
    threshold: 0.1
});

document
    .querySelectorAll('.reveal')
    .forEach(el => observer.observe(el));

/* ── FORMULÁRIO ── */
function handleSubmit(e) {

    e.preventDefault();

    const btn =
        document.getElementById('cta-btn');

    btn.textContent =
        '✓ Mensagem enviada! Entraremos em contato.';

    btn.style.background = '#16a34a';

    btn.disabled = true;
}