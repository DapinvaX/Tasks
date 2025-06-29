#!/usr/bin/env node

// Script para probar la conectividad con el backend desde terminal
// Ejecutar con: node test-connection.js

import https from 'https';

const BACKEND_URL = 'https://tasks-backend-j0qh.onrender.com';
const FRONTEND_URL = 'https://tasks-frontend-blue.vercel.app';

console.log('🧪 Probando conectividad con el backend...');
console.log('Backend URL:', BACKEND_URL);
console.log('Frontend URL:', FRONTEND_URL);
console.log('==================================\n');

// Test 1: Verificar si el backend está activo
async function testBackendStatus() {
    return new Promise((resolve) => {
        console.log('1️⃣ Probando si el backend está activo...');
        
        const req = https.get(BACKEND_URL, (res) => {
            console.log(`✅ Backend responde: ${res.statusCode} ${res.statusMessage}`);
            console.log('Headers:', Object.keys(res.headers).join(', '));
            resolve(true);
        });
        
        req.on('error', (error) => {
            console.log('❌ Backend no responde:', error.message);
            resolve(false);
        });
        
        req.setTimeout(10000, () => {
            console.log('⏰ Timeout - El backend tardó demasiado en responder');
            req.destroy();
            resolve(false);
        });
    });
}

// Test 2: Probar endpoint de test
async function testEndpoint() {
    return new Promise((resolve) => {
        console.log('\n2️⃣ Probando endpoint /api/test...');
        
        const req = https.get(`${BACKEND_URL}/api/test`, (res) => {
            console.log(`📡 Respuesta: ${res.statusCode} ${res.statusMessage}`);
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    console.log('📄 Datos:', json);
                } catch (e) {
                    console.log('📄 Respuesta (texto):', data.substring(0, 200));
                }
                resolve(res.statusCode === 200);
            });
        });
        
        req.on('error', (error) => {
            console.log('❌ Error en endpoint:', error.message);
            resolve(false);
        });
        
        req.setTimeout(10000, () => {
            console.log('⏰ Timeout en endpoint');
            req.destroy();
            resolve(false);
        });
    });
}

// Test 3: Probar CORS con preflight
async function testCORS() {
    return new Promise((resolve) => {
        console.log('\n3️⃣ Probando CORS...');
        
        const options = {
            hostname: 'tasks-backend-j0qh.onrender.com',
            path: '/api/login',
            method: 'OPTIONS',
            headers: {
                'Origin': FRONTEND_URL,
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        };
        
        const req = https.request(options, (res) => {
            console.log(`🌐 CORS Preflight: ${res.statusCode} ${res.statusMessage}`);
            console.log('CORS Headers:');
            Object.keys(res.headers).forEach(key => {
                if (key.toLowerCase().includes('access-control')) {
                    console.log(`   ${key}: ${res.headers[key]}`);
                }
            });
            resolve(res.statusCode === 200);
        });
        
        req.on('error', (error) => {
            console.log('❌ Error CORS:', error.message);
            resolve(false);
        });
        
        req.end();
    });
}

// Ejecutar todas las pruebas
async function runAllTests() {
    const results = {
        backend: await testBackendStatus(),
        endpoint: await testEndpoint(),
        cors: await testCORS()
    };
    
    console.log('\n==================================');
    console.log('📊 RESULTADOS:');
    console.log('Backend activo:', results.backend ? '✅' : '❌');
    console.log('Endpoint /api/test:', results.endpoint ? '✅' : '❌');
    console.log('CORS configurado:', results.cors ? '✅' : '❌');
    
    console.log('\n💡 RECOMENDACIONES:');
    if (!results.backend) {
        console.log('❌ El backend en Render no está activo o no responde');
        console.log('   - Verifica el dashboard de Render');
        console.log('   - Revisa los logs del servicio');
        console.log('   - Asegúrate de que no esté en modo "sleep"');
    }
    
    if (!results.endpoint) {
        console.log('❌ El endpoint /api/test no funciona');
        console.log('   - Verifica que el código esté desplegado correctamente');
        console.log('   - Revisa los logs de Render por errores');
    }
    
    if (!results.cors) {
        console.log('❌ CORS no está configurado correctamente');
        console.log('   - Verifica las variables de entorno en Render');
        console.log(`   - FRONTEND_URL debe ser: ${FRONTEND_URL}`);
        console.log('   - NODE_ENV debe ser: production');
    }
    
    if (results.backend && results.endpoint && results.cors) {
        console.log('🎉 ¡Todo funciona correctamente!');
        console.log('   El problema puede estar en el frontend o en las cookies');
    }
}

runAllTests().catch(console.error);
