'use client'

import { Box, Stack, Typography, Button } from '@mui/material'
import posthog from 'posthog-js'
import Terminal from '@/components/Terminal/Terminal'
import CopyButton from '@/components/CopyButton/CopyButton'
import { INSTALL_COMMAND } from '@/lib/install'
import {
  MotionReveal,
  MotionStagger,
  MotionItem
} from '@/components/motion/MotionPrimitives'

export default function Hero() {
  return (
    <Box
      id='install'
      component='section'
      className='rv-section'
      sx={{ pt: { xs: 8, md: 12 } }}
    >
      <Box className='rv-container'>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1fr) minmax(0, 1fr)'
            },
            gap: { xs: 6, md: 8, lg: 10 },
            alignItems: 'center'
          }}
        >
          <MotionStagger mode='initial' stagger={0.07}>
            <Stack spacing={4}>
              <MotionItem>
                <Typography variant='eyebrow' component='div'>
                  The standards layer for AI agents.
                </Typography>
              </MotionItem>

              <MotionItem>
                <Typography variant='h1' component='h1' sx={{ maxWidth: 680 }}>
                  One pipeline. Every agent.
                </Typography>
              </MotionItem>

              <MotionItem>
                <Typography
                  variant='subtitle1'
                  component='p'
                  color='text.secondary'
                  sx={{
                    maxWidth: 640,
                    fontSize: { xs: '1.0625rem', md: '1.1875rem' }
                  }}
                >
                  Stop correcting your AI. Start directing it.{' '}
                  <strong
                    style={{
                      color: 'var(--mui-palette-text-primary)',
                      fontWeight: 600
                    }}
                  >
                    reveren
                  </strong>{' '}
                  is structured, versioned, repo-aware guardrails for AI coding
                  agents — protocols plus pipelines that make whichever agent
                  you already pay for dramatically better.{' '}
                  <strong
                    style={{
                      color: 'var(--mui-palette-text-primary)',
                      fontWeight: 600
                    }}
                  >
                    Author once. Sell to every agent.
                  </strong>
                </Typography>
              </MotionItem>

              <MotionItem>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ pt: 1 }}
                >
                  <CopyButton
                    text={INSTALL_COMMAND}
                    variant='contained'
                    size='large'
                    sx={{
                      transition:
                        'transform 140ms cubic-bezier(0.22,1,0.36,1), box-shadow 140ms cubic-bezier(0.22,1,0.36,1)',
                      '&:hover': { transform: 'translateY(-1px)' }
                    }}
                  />
                  <Button
                    component='a'
                    href='/manifesto'
                    variant='outlined'
                    size='large'
                    onClick={() => posthog.capture('manifesto_cta_clicked', { source: 'hero' })}
                    sx={{
                      transition:
                        'transform 140ms cubic-bezier(0.22,1,0.36,1), box-shadow 140ms cubic-bezier(0.22,1,0.36,1)',
                      '&:hover': { transform: 'translateY(-1px)' }
                    }}
                  >
                    Read the manifesto
                  </Button>
                </Stack>
              </MotionItem>

              <MotionItem>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{ pt: 1 }}
                >
                  MIT-licensed CLI · agent-agnostic · open file format
                </Typography>
              </MotionItem>
            </Stack>
          </MotionStagger>

          <MotionReveal mode='initial' delay={0.28} duration={0.32} y={12}>
            <Box sx={{ minWidth: 0 }}>
              <Terminal />
            </Box>
          </MotionReveal>
        </Box>
      </Box>
    </Box>
  )
}
