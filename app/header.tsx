'use client'

import {
    Box,
    BoxProps, Button, ButtonProps, CloseButton,
    Container,
    Flex, forwardRef, HStack, IconButton, IconButtonProps, LinkProps, Stack,
    Text, useBreakpointValue, useColorMode,
    useColorModeValue,
    useDisclosure,
    useUpdateEffect
} from "@chakra-ui/react";
import * as React from "react";
import {useScroll} from "framer-motion";
import {Link} from "@saas-ui/react";
import {usePathname, useRouter} from "next/navigation";
import {FiMoon, FiSun} from "react-icons/fi";
import {RemoveScroll} from "react-remove-scroll";
import {AiOutlineMenu} from "react-icons/ai";
import {useEffect, useRef} from "react";


export const Header = () => {
    const ref = React.useRef<HTMLHeadingElement>(null)
    const [y, setY] = React.useState(0)
    const {height = 0} = ref.current?.getBoundingClientRect() ?? {}

    const {scrollY} = useScroll()
    React.useEffect(() => {
        return scrollY.on('change', () => setY(scrollY.get()))
    }, [scrollY])

    const bg = useColorModeValue('whiteAlpha.700', 'rgba(29, 32, 37, 0.7)')

    return (
        <Box
            ref={ref}
            as="header"
            top="0"
            w="full"
            position="fixed"
            backdropFilter="blur(5px)"
            zIndex="sticky"
            borderColor="whiteAlpha.100"
            transitionProperty="common"
            transitionDuration="normal"
            bg={y > height ? bg : ''}
            boxShadow={y > height ? 'md' : ''}
            borderBottomWidth={y > height ? '1px' : ''}
        >
            <Container maxW="container.2xl" px="8" py="4">
                <Flex width="full" align="center" justify="space-between">
                    <Logo
                        onClick={(e) => {
                            if (window.location.pathname === '/') {
                                e.preventDefault()

                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                })
                            }
                        }}
                    />
                    <Navigation/>
                </Flex>
            </Container>
        </Box>
    )
}

interface LogoProps {
    href?: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const Logo = ({href = '/', onClick}: LogoProps) => {
    return (
        <Flex h="8" flexShrink="0" alignItems="flex-start">
            <Link
                href={href}
                display="flex"
                p="1"
                borderRadius="sm"
                onClick={onClick}
                _hover={{}}
            >
                <Text fontSize={"20px"} fontWeight={"bold"}>{siteConfig.seo?.title}</Text>
            </Link>
        </Flex>
    )
}

const Navigation: React.FC = () => {
    const mobileNav = useDisclosure()
    const router = useRouter()
    const path = usePathname()
    const activeId = useScrollSpy(
        siteConfig.header.links
            .filter(({id}) => id)
            .map(({id}) => `[id="${id}"]`),
        {
            threshold: 0.75,
        },
    )

    const mobileNavBtnRef = React.useRef<HTMLButtonElement>()

    useUpdateEffect(() => {
        mobileNavBtnRef.current?.focus()
    }, [mobileNav.isOpen])

    return (
        <HStack spacing="2" flexShrink={0}>
            {siteConfig.header.links.map(({href, id, ...props}, i) => {
                return (
                    <NavLink
                        display={['none', null, 'block']}
                        href={href || `/#${id}`}
                        key={i}
                        isActive={
                            !!(
                                (id && activeId === id) ||
                                (href && !!path?.match(new RegExp(href)))
                            )
                        }
                        {...props}
                    >
                        {props.label}
                    </NavLink>
                )
            })}

            {/*<ThemeToggle/>*/}

            <MobileNavButton
                ref={mobileNavBtnRef}
                aria-label="Open Menu"
                onClick={mobileNav.onOpen}
            />

            <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose}/>
        </HStack>
    )
}

const siteConfig = {
    seo: {
        title: 'Tarwiiga AI',
        description: 'Custom AI Agents for every business',
    },
    termsUrl: '#',
    privacyUrl: '#',
    header: {
        links: [
            {
                id: 'blogs',
                label: 'Blogs',
                href: '/blogs',
            },
        ],
    },
}

interface NavLinkProps extends ButtonProps {
    isActive?: boolean;
    href?: string;
    id?: string;
}

const NavLink = forwardRef<NavLinkProps, "a">((props, ref) => {
    const {href, type, isActive, ...rest} = props;

    return (
        <Button
            as={Link}
            href={href}
            ref={ref}
            variant="nav-link"
            lineHeight="2rem"
            isActive={isActive}
            fontWeight="medium"
            color={"black"}
            {...rest}
        />
    );
});

const ThemeToggle = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    return (
        <IconButton
            variant="ghost"
            aria-label="theme toggle"
            icon={colorMode === 'light' ? <FiMoon size="14"/> : <FiSun size="14"/>}
            borderRadius="md"
            onClick={toggleColorMode}
        />
    )
}

interface MobileNavLinkProps extends LinkProps {
    label: string
    href?: string
    isActive?: boolean
}

function MobileNavLink({href, children, isActive, ...rest}: MobileNavLinkProps) {
    const pathname = usePathname()
    const bgActiveHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100')

    const [, group] = href?.split('/') || []
    isActive = isActive ?? pathname?.includes(group)

    return (
        <Link
            href={href}
            display="inline-flex"
            flex="1"
            minH="40px"
            px="8"
            py="3"
            transition="0.2s all"
            fontWeight={isActive ? 'semibold' : 'medium'}
            borderColor={isActive ? 'purple.400' : undefined}
            borderBottomWidth="1px"
            color={isActive ? 'white' : undefined}
            _hover={{
                bg: isActive ? 'purple.500' : bgActiveHoverColor,
            }}
            {...rest}
        >
            {children}
        </Link>
    )
}

interface MobileNavContentProps {
    isOpen?: boolean
    onClose?: () => void
}

function MobileNavContent(props: MobileNavContentProps) {
    const {
        isOpen, onClose = () => {
        }
    } = props
    const closeBtnRef = React.useRef<HTMLButtonElement>(null)
    const pathname = usePathname()
    const bgColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.900')

    useRouteChanged(onClose)
    console.log({isOpen})
    /**
     * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
     * Result: We'll close the menu
     */
    const showOnBreakpoint = useBreakpointValue({base: true, lg: false})

    React.useEffect(() => {
        if (showOnBreakpoint == false) {
            onClose()
        }
    }, [showOnBreakpoint, onClose])

    useUpdateEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                closeBtnRef.current?.focus()
            })
        }
    }, [isOpen])

    return (
        <>
            {isOpen && (
                <RemoveScroll forwardProps>
                    <Flex
                        direction="column"
                        w="100%"
                        bg={bgColor}
                        h="100vh"
                        overflow="auto"
                        pos="absolute"
                        inset="0"
                        zIndex="modal"
                        pb="8"
                        backdropFilter="blur(5px)"
                    >
                        <Box>
                            <Flex justify="space-between" px="8" pt="4" pb="4">
                                <Logo/>
                                <HStack spacing="5">
                                    <CloseButton ref={closeBtnRef} onClick={onClose}/>
                                </HStack>
                            </Flex>
                            <Stack alignItems="stretch" spacing="0">
                                {siteConfig.header.links.map(
                                    ({href, id, label, ...props}, i) => {
                                        return (
                                            <MobileNavLink
                                                href={href || `/#${id}`}
                                                key={i}
                                                {...(props as any)}
                                            >
                                                {label}
                                            </MobileNavLink>
                                        )
                                    },
                                )}
                            </Stack>
                        </Box>
                    </Flex>
                </RemoveScroll>
            )}
        </>
    )
}

const MobileNavButton = React.forwardRef(
    (props: IconButtonProps, ref: React.Ref<any>) => {
        return (
            <IconButton
                ref={ref}
                display={{base: 'flex', md: 'none'}}
                fontSize="20px"
                color={useColorModeValue('gray.800', 'inherit')}
                variant="ghost"
                icon={<AiOutlineMenu/>}
                {...props}
                aria-label="Open menu"
            />
        )
    },
)

const useRouteChanged = (fn: () => void) => {
    const pathname = usePathname()

    const lastPathname = useRef(pathname)

    useEffect(() => {
        if (lastPathname.current === null) {
            return
        }

        if (pathname !== lastPathname.current) {
            fn()
        }
    }, [pathname, fn])
}

function useScrollSpy(
    selectors: string[],
    options?: IntersectionObserverInit
) {
    const [activeId, setActiveId] = React.useState<string | null>()
    const observer = React.useRef<IntersectionObserver | null>(null)
    React.useEffect(() => {
        const elements = selectors.map((selector) =>
            document.querySelector(selector)
        )
        observer.current?.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry?.isIntersecting) {
                    setActiveId(entry.target.getAttribute('id'))
                }
            })
        }, options)
        elements.forEach((el) => {
            if (el) observer.current?.observe(el)
        })
        return () => observer.current?.disconnect()
    }, [selectors, options])

    return activeId
}
